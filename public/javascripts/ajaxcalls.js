const dbAPI = new APIHandler();

$(document).ready(()=>{
  dbAPI.getFeedbackInfo($("#itemId").val(), feedInfo);
});
