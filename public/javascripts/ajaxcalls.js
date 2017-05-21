const dbAPI = new APIHandler();

$(document).ready(()=>{
  // dbAPI.getFullList("messages");
  $(".main").on("click", ".test", (event)=>{
    console.log(event);
    console.log(event.currentTarget.value);
    console.log(event.currentTarget.id);
    if(event.currentTarget.id[0]=="+"){
      dbAPI.updateOneRegister("messages", event.currentTarget.id.slice(1), {score: Number(event.currentTarget.value) +1 });
    }
    else{
      dbAPI.updateOneRegister("messages", event.currentTarget.id.slice(1), {score: Number(event.currentTarget.value) -1 });
    }
  });

});


function vote(sign, messageid){

}
