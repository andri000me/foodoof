<?php if(sizeof($list_recipes1) > 0):?>
<div id="carousel-example-captions" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators" style="bottom:10px;">
    {list_recipes1}
      <li data-target="#carousel-example-captions" data-slide-to="{num}" class="{isactive} bg-li-highlight"></li>
    {/list_recipes1}
  </ol>
  <div class="carousel-inner" role="listbox">
    {list_recipes2}
      <div class="item {isactive}">
        <img data-src="holder.js/900x500/auto/#777:#777" alt="{name}" src="{photo}" class="img-responsive center-block " data-holder-rendered="true" style="height:400px">
        <div class="carousel-caption" style="bottom:0">
          <a href="<?php echo base_url();?>index.php/recipe/get/{id}"><h3>{name}<a class="anchorjs-link" href="#first-slide-label"><span class="anchorjs-icon"></span></a></h3></a>
          <p style="color:black;">{description}</p>
        </div>
      </div>
    {/list_recipes2}
  </div>
  <a class="left carousel-control" href="#carousel-example-captions" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left text-foodoof" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-captions" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right text-foodoof" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<a href='<?php echo base_url();?>index.php/home/highlight' style="position:absolute; top:0px; left:30px;">
  <h3 class="text-foodoof">Highlight Recipe</h3>
</a>
<?php endif;?>