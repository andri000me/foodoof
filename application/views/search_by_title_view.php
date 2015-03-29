<div class="panel-body">
  <div class="col-md-12">
    <h3 class="page-header" style="margin-top:5px">
      {search_by_title_recipe_result}
      <?php
        if($search_by_title_recipe_result > 1){
          echo "results";
        }
        else{
          echo "result"; 
        }
      ?>
      of {search_by_title_recipe_key} 
    </h3>
  </div>
  {search_by_title_recipe_entries}
  <div class="col-md-12 col-no-padding-right page-header" style="margin-top:5px">
    <div class="col-md-2 col-xs-3 detail-list-img" style="margin-right:2px">
        <img class="img-responsive img-rounded img-list-usertimeline" src="<?php echo base_url();?>assets/img/01.jpg"/>
    </div>
    <div class="col-md-6 col-xs-8 detail-list">
      <div class="col-md-12 details">
            <div class="col-md-12 col-xs-9">
              <h4><p class="text-capitalize">{search_by_title_recipe_name}</p></h4>
            </div>
        </div>
        <div class="col-md-12 details">
            <div class="col-md-4 col-xs-3 col-no-padding-right">
              <p class="text-capitalize">Last update :</p>
            </div>
            <div class="col-md-8 col-xs-9 col-no-padding-left">
              <p class="text-capitalize">{search_by_title_recipe_last_update}</p>
            </div>
        </div>
        <div class="col-md-12 details">
          <div class="col-md-11" title="Rating">
              <input id="input-2b" class="rating" value="{search_by_title_recipe_rating}" data-min="0" data-max="5" data-starts=3 data-step="0.1" data-stars=5 data-symbol="&#xe005;" data-size="xs" data-default-caption="{rating} hearts" data-star-captions="{}" data-show-clear="false">
          </div>
        </div>  
    </div>
  </div>
  {/search_by_title_recipe_entries}
  <div class="col-md-12 text-center">
    <?php
      if($search_by_title_recipe_page_size > 0){
        echo "<nav>
                <ul class='pager'>
                  <li class='";
        if($search_by_title_recipe_page_size - $search_by_title_recipe_page_now == ($search_by_title_recipe_page_size-1)){
            echo "disabled";
          }
        echo "'><a href='search/title?q=".urlencode($search_by_title_recipe_key)."&page=".($search_by_title_recipe_page_now - 1)."' aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </a></li>";
        for ($i=1; $i <= $search_by_title_recipe_page_size ; $i++) { 
          $active = "";
          if($i == $search_by_title_recipe_page_now){
            $active = "active";
          }
          echo "
            <li class=".$active.">
              <a href='search/title?q=".urlencode($search_by_title_recipe_key)."&page=".$i."'>".$i."</a>
            </li>
          ";
        }

        echo "<li class='";
        if($search_by_title_recipe_page_size == $search_by_title_recipe_page_now){
            echo "disabled";
          }
        echo "'><a href='search/title?q=".urlencode($search_by_title_recipe_key)."&page=".($search_by_title_recipe_page_now + 1)."' aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </a></li></ul></nav>
        ";
      }
    ?>
  </div>
</div>