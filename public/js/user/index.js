$(document).ready(function(){
   $('#fileExcel').change(function() {
        $('#excel').submit();
   });
   $('#csv').change( () => {
      $('#csv').submit();
   });
});
