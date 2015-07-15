<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
        /**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
        protected $guarded = array('id');
        
        /**
         * Fetch item details
         * If item_id is provided then details of only that item will be fetched
         * Else complete list will be retrieved
         *
         * @param null $item_id
         * @return object
         */
        public function itemDetails($item_id = NULL)
        {
                $item = Item::select('id', 'name', 'unit', 'rate', 'tax_id', 'description');
                
                if(!is_null($item_id))
                {
                        $item = $item->where('id', $item_id)->first();
                }
                
                return $item;
        }
        
        /**
	 * Save item details
	 *
	 * @param array $data
	 * @return int
	 */
        public function saveItem($data)
        {
                unset($data['item_id']);
                $item = Item::create($data);
                return $item->id;
        }
        
        /**
	 * Update item details
	 *
	 * @param array $data
	 * @return int
	 */
        public function updateItem($data)
        {
                $item_id = $data['item_id'];
		unset($data['item_id']);
		
		$updated_rows = Item::where('id', $item_id)->update($data);
		
		// Return number of rows updated
		return $updated_rows;
        }
        
        /**
	 * Count duplicate fields
	 * If check is done while updating data then check except this id
	 *
	 * @param string $field_name
	 * @param array $fields
	 * @return int
	 */
	public function duplicateField($field_name, $fields)
	{
		$field_count = Item::where($field_name, $fields['name']);
                
                if(!empty($fields['item_id']))
                {
			$field_count = $field_count->where('id', '!=', $fields['item_id']);
                }
		
                $field_count = $field_count->count();
		
		return $field_count;
	}
}
