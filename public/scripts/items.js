// This code runs when DOM is "ready"
$(document).ready(function(){
	
        // Display items list in DataTable
	// Make id column hidden which will be used to fetch item details while editing
	var items_table = $('table#items_table').DataTable({
		processing: true,
		serverSide: true,
		ajax: base + "/item-list",
		columns: [
			{ data: 'id', name: 'id' },
			{
				data:   "id",
				render: function ( data, type, row ) {
					return '<input type="checkbox" class="margin-checkbox items" value="'+data+'">';
				}
			},
			{ data: 'name', name: 'name' },
			{ data: 'description', name: 'description' },
			{ data: 'rate', name: 'rate' }
		],
		"aoColumnDefs": [
                        { 'bSortable': false, 'aTargets': [1,3] },
			{ "visible": false, "aTargets": [0] }
                ]
        });
	
	// (ADD item) Display modal to add item
        $('.add_item').click(function() {
		var item_id = $(this).data('item_id');
                
		$.ajax({
			url: base + '/add-item',
			type: "GET",
			dataType: "html",
			success: function(data) {
				$('#add_item_modal_body').html(data);
				$('#add_item_modal').modal();
			}
		});
	});
	
	var all_selected = [];
	// (Header checkbox) Check all items to be deleted
	$('table#items_table thead').on('click', 'tr > th:nth-child(1)', function () {
		// If header is checked then first empty 'all_selected' array and
		// Check all individual checkboxes
		if ($(this).find('input:checkbox').is(':checked')) {
			$(this).find('input:checkbox').prop('checked', false);
			$('.items').prop('checked', false);
			$(".delete_item").css("display", "none");
		} else {
			all_selected = [];
			$(this).find('input:checkbox').prop('checked', true);
			$('.items').prop('checked', true);
			$(".delete_item").css("display", "inline");
		}
		
		// Loop through all checked checkbox and store in 'all_selected' array
		$('.items:checked').each(function() {
			all_selected.push($(this).val());
		});
		
		// Loop through all unchecked checkbox and remove element from 'all_selected' array
		$('.items:not(:checked)').each(function() {
			if ((index = all_selected.indexOf($(this).val())) !== -1) {
				all_selected.splice(index, 1);
			}
		});
	});
	
	// (Individual Checkbox) push checked items in an array
	$('table#items_table tbody').on('click', 'tr > td:nth-child(1)', function () {
		if ($(this).find('input:checkbox').is(':checked')) {
			$(this).find('input:checkbox').prop('checked', false);
		} else {
			$(this).find('input:checkbox').prop('checked', true);
		}
		
		var total_length = $('.items').length;
		var total_checked_length = $('.items:checked').length;
		
		// If all checkboxes are checked then check header checkbox too
		if (total_length == total_checked_length) {
			$('#select_all_items').prop('checked', true);
		} else {
			$('#select_all_items').prop('checked', false);
		}
		
		// Get item id
		var item_id = $(this).find('input').val();
		var is_checked = $(this).find('input').is(":checked");
		
		// If checkbox is checked then store item id in 'all_selected' array
		// If checkbox is unchecked then remove item id from 'all_selected' array
		if (is_checked) {
			all_selected.push(item_id);
		} else {
			if ((index = all_selected.indexOf(item_id)) !== -1) {
				all_selected.splice(index, 1);
			}
		}
		
		// Remove duplicate elements from selected array
		all_selected = $.unique(all_selected);
		
		if (all_selected != "") {
			$(".delete_item").css("display", "inline");
		} else {
			$(".delete_item").css("display", "none");
		}
	});
	
	// (DELETE item) Confirm & Delete item
	$('.delete_item').click(function(){
		var token = $(this).data('token');
		
		$('<div></div>').appendTo('body')
		.html('<div style="text-align:center;"><h4>Are you sure about deleting these items?</h4></div>')
		.dialog({
			modal: true, title: 'Delete Items', zIndex: 10000, autoOpen: true,
			resizable: false,
			buttons: {
				Ok: function () {
					var input = $("<input>").attr("type", "hidden").attr("name", "pakbon").val("1");
					deleteItems(token, all_selected);
					$(this).dialog("close");
					$(".delete_item").css("display", "none");
					
					// Reload DataTable
					items_table.ajax.reload( null, false );
				},
				Cancel: function () {
					$(this).dialog("close");
				}
			},
			close: function (event, ui) {
				$(this).remove();
			}
		});
	});
	
	// (EDIT item) Get item details and display it in modal
	$('table#items_table tbody').on('click', 'tr > td:not(:nth-child(1))', function () {
		var item_id = items_table.row($(this).parent()).data().id;
		
		$.ajax({
			url: base + '/item-details',
			type: "GET",
			data: {
                                item_id: item_id
                        },
			dataType: "html",
			success: function(data) {
				$('#add_item_modal_body').html(data);
				$('#add_item_modal').modal();
			}
		});
	});
	
	// (SAVE item) Validate and save item
	$('.save_item').click(function() {
		var flag = 1;
		
		var rate = new validateElement("#rate", "#rate_error", "Please enter the rate of the item.");
		var name = new validateElement("#name", "#name_error", "Please mention the item name");
		
		if(name.empty_flag === 0 || rate.empty_flag === 0) {
                        
                        flag = 0;
			$(".error-box").css("display", "block");
                        
                } else {
			$(".error-box").css("display", "none");
			
			// For rate if numeric value is not inserted then change value to '0.00'
			if (!$.isNumeric($('#rate').val())) {
				$('#rate').val('0.00');
				$('#rate').removeClass("txt-error");
			}
		}
		
		if (flag === 1) {
			
			// Check duplicate name
                        var name = $("#name").val();
			var item_id = $('[name="item_id"]').val();
                        
                        // If no duplicate name, then save item details
                        $.ajax({
                                url: base + '/duplicate-name',
                                type: "GET",
                                data: {
                                        item_id: item_id,
                                        name: name
                                },
                                success: function(response) {
                                        if (response == 0) {
						// Call function saveItem() which saves data via AJAX
                                                saveItem();
						$('#add_item_modal').modal('hide');
						items_table.ajax.reload( null, false );
                                        } else {
						$(".error-box").css("display", "block");
						
                                                $("#name").focus();
                                                $("#name").addClass("txt-error");
                                                $("#name_error").css("display", "block");
                                                $("#name_error").html('Item "'+name+'" already exists.');
                                        }
                                }
                        });
		}
	});
	
	// On keyup check if rate input value is numeric
	// If not numeric color textbox border with red
	$('body').on('keyup', '#rate', function() {
		if (!$.isNumeric($(this).val())) {
			$(this).addClass("txt-error");
		} else {
			$(this).removeClass("txt-error");
		}
	});
	
});

/**
 * Save item details
 *
 * @return void
 */
function saveItem() {
	var form_data = $("form#item_details_form").serialize();
	
	$.ajax({
		url: base + '/add-update-item',
		type: "POST",
		data: form_data,
		dataType: "json",
		success: function(data) {
			if (data.success == 1) {
				message = "<div class='alert alert-success'>" + data.msg
				+ "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button></div>";
			} else {
				message = "<div class='alert alert-danger'>" + data.msg
				+ "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button></div>";
			}
			$('.message').html(message);
		}
	});
}

/**
 * Delete items
 *
 * @param string token
 * @param array selected
 * @return void
 */
function deleteItems(token, selected) {
	$.ajax({
		url: base + '/delete-item',
		type: "POST",
		data: {
			items_id: selected,
			_token: token
		},
		dataType: "json",
		success: function(data) {
			if (data.success == 1) {
				message = "<div class='alert alert-success'>" + data.msg
				+ "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button></div>";
			} else {
				message = "<div class='alert alert-danger'>" + data.msg
				+ "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button></div>";
			}
			$('.message').html(message);
		}
	});
	
	// Hide Delete button
	$(".delete_item").css("display", "none");
}

/**
 * The object contructor function
 * sets empty_flag to '0', if element value is empty.
 *
 * @param string element
 * @param string error_element
 * @param string error_msg
 * @return void
 */
function validateElement(element, error_element, error_msg) {
	
	this.empty_flag = 1;
	
	// element validation
	if($(element).val() === "") {
		
		$(element).focus();
		$(error_element).addClass('display-block');
		$(error_element).html(error_msg);
		this.empty_flag = 0;
		
	} else {
		
		$(error_element).addClass('display-none');
		$(error_element).html("");
		
	}
	
}