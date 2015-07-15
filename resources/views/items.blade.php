@extends('app')

@section('content')
<div class="container">
	<div class="row">
                <div class="col-xs-12">
			<span class="message"></span>
		</div>
        </div>
        <div class="row">
                <div class="col-xs-12">
                        <div class="pull-right padding-bottom15">
                                <button class="btn btn-sm btn-danger add_item" name="">+ New Item</button>
                        </div>
                </div>
        </div>
	<div class="row">
                <div class="col-md-12">
			<table class="table table-hover table-border" id="items_table">
				<thead>
					<tr>
						<th class="col-xs-3">
							Id
						</th>
						<th class="col-xs-3">
							Name
						</th>
						<th class="col-xs-3">
							Description
						</th>
						<th class="col-xs-3">
							Rate
						</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Add / Edit Item Modal -->
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel"
	id="add_item_modal">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">New Item</h4>
			</div>
			<div class="modal-body" id="add_item_modal_body">
				<!-- View file will be added via jQuery. Same file will be used for edit -->
			</div>
			<div class="modal-footer">
				<div class="pull-left">
					<button type="button" class="btn btn-danger save_item"
						data-token="{{ csrf_token() }}">
						Save
					</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</div>	
@endsection