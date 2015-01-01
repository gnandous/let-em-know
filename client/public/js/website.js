if (typeof errors !== 'undefined'){
  for(i = 0; i < errors.length; i++){
    key = errors[i];
    $("#" + key.field).siblings().addClass('control-label');
    $("#" + key.field).parent().addClass('has-error');
  }
}
