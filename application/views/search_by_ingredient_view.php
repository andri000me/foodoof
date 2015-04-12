<div class="panel-body">
  <div class="col-md-12 col-xs-12">
    <h3 class="page-header" style="margin-top:5px">
      {search_by_ingredient_recipe_result}
      <?php
        if($search_by_ingredient_recipe_result > 1){
          echo "results";
        }
        else{
          echo "result"; 
        }
      ?>
      of {search_by_ingredient_recipe_key} 
    </h3>
  </div>
  {search_by_ingredient_recipe_entries}
  <div class="col-md-12 col-xs-12col-no-padding-right page-header" style="margin-top:5px">
    <div class="col-md-2 col-xs-3 detail-list-img" style="margin-right:2px">
        <a href="<?php echo base_url();?>recipe/get/{search_by_ingredient_recipe_id}">
          <img class="img-responsive img-rounded img-list-usertimeline" src="<?php echo base_url();?>{search_by_ingredient_recipe_photo}"/>
        </a>
    </div>
    <div class="col-md-6 col-xs-9 detail-list">
      <div class="col-md-12 col-xs-12 details">
          <div class="col-md-12 col-xs-9">
            <a href="<?php echo base_url();?>recipe/get/{search_by_ingredient_recipe_id}">
              <h4><p class="text-capitalize">{search_by_ingredient_recipe_name}</p></h4>
            </a>
          </div>
      </div>
      <div class="col-md-12 col-xs-12 details">
          <div class="col-md-6 col-xs-3 col-no-padding-right">
            <a href="<?php echo base_url();?>user/timeline/{search_by_ingredient_recipe_author_id}"><p class="text-capitalize">{search_by_ingredient_recipe_author_name}</p></a>
          </div>
          <div class="col-md-6 col-xs-9" style="border-left:dashed 1px rgb(56,150,211)">
            <p class="text-capitalize">{search_by_ingredient_recipe_last_update}</p>
          </div>
      </div>
      <div class="col-md-12 col-xs-12 details">
        <div class="col-md-11" title="Rating">
            <input id="input-2b" class="rating" value="{search_by_ingredient_recipe_rating}" data-min="0" data-max="5" data-starts=3 data-step="0.1" data-stars=5 data-symbol="&#xe005;" data-size="xs" data-default-caption="{rating} hearts" data-star-captions="{}" data-show-clear="false">
        </div>
      </div> 
      <div class="col-md-12 col-xs-12 details">
          Found {search_by_ingredient_recipe_found} 
      </div> 
    </div>
  </div>
  {/search_by_ingredient_recipe_entries}
  <div class="col-md-12 col-xs-12 text-center">
    <?php
      if($search_by_ingredient_recipe_page_size > 0){
        echo "<nav>
                <ul class='pager'>
                  <li class='";
        if($search_by_ingredient_recipe_page_size - $search_by_ingredient_recipe_page_now == ($search_by_ingredient_recipe_page_size-1)){
            echo "disabled";
          }
        echo "'><a href='".base_url()."search/?q=".urlencode($search_by_ingredient_recipe_key)."&searchby=ingredient&page=".($search_by_ingredient_recipe_page_now - 1)."' aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </a></li>";
        for ($i=1; $i <= $search_by_ingredient_recipe_page_size ; $i++) { 
          $active = "";
          if($i == $search_by_ingredient_recipe_page_now){
            $active = "active";
          }
          echo "
            <li class=".$active.">
              <a href='".base_url()."search/?q=".urlencode($search_by_ingredient_recipe_key)."&searchby=ingredient&page=".$i."'>".$i."</a>
            </li>
          ";
        }

        echo "<li class='";
        if($search_by_ingredient_recipe_page_size == $search_by_ingredient_recipe_page_now){
            echo "disabled";
          }
        echo "'><a href='".base_url()."search/?q=".urlencode($search_by_ingredient_recipe_key)."&searchby=ingredient&page=".($search_by_ingredient_recipe_page_now + 1)."' aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </a></li></ul></nav>
        ";
      }
    ?>
  </div>
</div>