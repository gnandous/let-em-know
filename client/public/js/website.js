if (typeof errors !== 'undefined'){
  for(i = 0; i < errors.length; i++){
    key = errors[i];
    $("label[for='" + key.field + "'").addClass("control-label");
    $("input[name='" + key.field + "'").parent().addClass('has-error');
  }
}
