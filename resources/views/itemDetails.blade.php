<div class="row">
        <div class="col-md-12">
                <form class="form-horizontal" id="item_details_form">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="item_id" value="{{(!empty($item_details->id)) ? $item_details->id : ''}}">
                        
                        <div class="row error-box">
                                <div class="col-md-12">
                                        <div class="alert alert-danger">
                                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                        &times;
                                                </button>
                                                <ul>
                                                        <li id="name_error"></li>
                                                        <li id="rate_error"></li>
                                                </ul>
                                        </div>
                                </div>
                        </div>
                        <div class="row">
                                <div class="form-group col-md-6">
                                        <label for="name" class="control-label">
                                                <span class="required">Name</span>
                                        </label>
                                        <input type="text" class="form-control" id="name" name="name" 
                                                value="{{(!empty($item_details->name)) ? $item_details->name : ''}}">
                                </div>
                                <div class="form-group col-md-6">
                                        <label for="unit" class="control-label">
                                                Unit
                                        </label>
                                        <input type="text" class="form-control" id="unit"  placeholder="Select or Type to add"
                                                name="unit" value="{{(!empty($item_details->unit)) ? $item_details->unit : ''}}">
                                </div>
                        </div>
                        <div class="row">
                                <div class="form-group col-md-6">
                                        <label for="rate" class="control-label">
                                                <span class="required">Rate</span>
                                        </label>
                                        <div class="input-group">
                                                <span class="input-group-addon">INR</span>
                                                <input type="text" class="form-control" id="rate" name="rate" 
                                                        value="{{(!empty($item_details->rate)) ? $item_details->rate : ''}}">
                                        </div>
                                </div>
                                <div class="form-group col-md-6">
                                        <label for="tax_id" class="control-label">
                                                Tax
                                        </label>
                                        <select name="tax_id" class="form-control select2" id="tax_id">
                                                <option value="">Select a Tax</option>
                                                <option value="1" {{(!empty($item_details->tax_id) &&
                                                        $item_details->tax_id == 1) ? 'selected' : ''}}>Income Tax</option>
                                                <option value="2" {{(!empty($item_details->tax_id) &&
                                                        $item_details->tax_id == 2) ? 'selected' : ''}}>Sales Tax</option>
                                                <option value="3" {{(!empty($item_details->tax_id) &&
                                                        $item_details->tax_id == 3) ? 'selected' : ''}}>Value Added Tax</option>
                                        </select>
                                </div>
                        </div>
                        <div class="row">
                                <div class="form-group col-md-12">
                                        <textarea class="form-control" name="description" placeholder="Description" id="description"
                                                >{{(!empty($item_details->description)) ? $item_details->description : ''}}</textarea>
                                </div>
                        </div>
                </form>
        </div>
</div>

<script>
        // Select2 is used for tax_id dropdown
        $('.modal .select2').select2();
</script>