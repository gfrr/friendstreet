const dbAPI = new APIHandler();

$(document).ready(()=>{
  // dbAPI.getFullList("messages");
  $(".main").on("click", ".test", (event)=>{
    console.log(event);
    console.log(event.currentTarget.value);
    console.log(event.currentTarget.id);

    if(event.currentTarget.id[0]=="+"){
      dbAPI.updateOneRegister("messages", event.currentTarget.id.slice(1), {score: Number(event.currentTarget.value) +1 });
      event.currentTarget.parentElement.children[1].innerHTML = Number(event.currentTarget.value)+1;
      $(event.currentTarget.parentElement.children[0]).hide();
      $(event.currentTarget.parentElement.children[2]).hide();
    }
    else{
      dbAPI.updateOneRegister("messages", event.currentTarget.id.slice(1), {score: Number(event.currentTarget.value) -1 });
      event.currentTarget.parentElement.children[1].innerHTML = Number(event.currentTarget.value)-1;
      $(event.currentTarget.parentElement.children[0]).hide();
      $(event.currentTarget.parentElement.children[2]).hide();
    }
  });

});


function refresh(){
  
}
