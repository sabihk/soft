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
			{ data: 'name', name: 'name' },
			{ data: 'description', name: 'description' },
			{ data: 'rate', name: 'rate' }
		],
		"aoColumnDefs": [
                        { 'bSortable': false, 'aTargets': [2] },
			{ "visible": false, "aTargets": [0] }
                ],
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
	
	// (EDIT item) Get item details and display it in modal
	$('table#items_table tbody').on('click', 'tr', function () {
		var item_id = items_table.row(this).data().id;
		
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