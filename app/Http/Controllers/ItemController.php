<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Item;
use Response;
use yajra\Datatables\Datatables;

class ItemController extends Controller
{
        /**
         * Display items view as default page
         *
         * @return Response
         */
        public function index()
        {
                return view('items');
        }
	
	/**
         * Display items list in Ajaxified DataTable
         *
         * @return Response
         */
	public function getItemList()
	{
		if (\Request::ajax())
		{
			$item = new Item();
			$item_details = $item->itemDetails();
			
			$item_details = Datatables::of($item_details)
						->make(true);
				
			return $item_details;
		}
	}
	
        /**
         * Show the form for creating a new item.
         *
         * @return Response
         */
        public function getAddItem()
        {
                if (\Request::ajax())
		{
			return view('itemDetails');
		}
        }
    
        /**
         * Save new item
         *
         * @return json
         */
        public function postAddUpdateItem()
        {
                if (\Request::ajax())
		{
                        try
                        {
                                $data = \Request::all();
                                unset($data['_token']);
				
				$saved_item_id = 0;
				$affected_rows = 0;
				
                                $item = new Item();
				
				// item_id will be empty while adding new item (Save item)
				// item_id will not be empty while updating item (Update item)
				if(!empty($data['item_id']))
				{
					$affected_rows = $item->updateItem($data);
				}
				else
				{
					$saved_item_id = $item->saveItem($data);
				}
                                
                                if($saved_item_id > 0)
                                {
                                        return Response::json(array('success' => 1, 'msg' => 'The item has been added !'));
                                }
				elseif($affected_rows > 0)
				{
					return Response::json(array('success' => 1, 'msg' => 'Item details have been saved !'));
				}
                                else
                                {
                                        return Response::json(array('success' => 0, 'msg' => 'Error Occurred while saving item !'));
                                }
			}
                        catch(\Exception $e)
                        {
				return Response::json(array('success' => 0, 'msg' => 'Error Occurred !'));
			}
                }
        }
    
        /**
         * Get item details to display in modal for edit
         *
         * @return Response
         */
        public function getItemDetails()
        {
                $item_id = \Request::input('item_id');
		
		$item = new Item();
		$item_details = $item->itemDetails($item_id);
		
		return view('itemDetails')
			->with('item_details', $item_details);
        }
    
        /**
         * Check duplicate name
         *
         * @return int
         */
        public function getDuplicateName()
        {
                if (\Request::ajax())
		{
			$fields = \Request::all();
			$field_name = 'name';
			
			$item = new Item();
			$field_exist = $item->duplicateField($field_name, $fields);
			
			return $field_exist;
		}
        }
}
