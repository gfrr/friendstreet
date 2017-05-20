class APIHandler {
  constructor () {
    this.BASE_URL = "http://localhost:3000";
  }



  getFullList (types, location = undefined) {
    const url = location ? this.BASE_URL + "/api/" + types + "?q=" + location : this.BASE_URL + "/api/" + types;
    $.ajax ({
      url: url,
      method: "GET",
      dataType: "json",
      success: (response)=> {
        response.forEach((elem, index)=>{
        console.log(response);
        });
      },
      error: (error) => console.log(error),
    });
  }

  getOneRegister (types, id, callback = undefined) {
    $.ajax ({
      url: this.BASE_URL + "/api/" + type + "/" + String(id),
      method: "GET",
      dataType: "json",
      success: (response)=> {
        if(typeof(callback) === "undefined") console.log(response);
        else callback(response);
      },
      error: (error) => console.log(`${id} not found`),
    });
  }

  getUserMessages(id, callback) {
    $.ajax ({
      url: this.BASE_URL + "/api/items/" + String(id) +"/items_user",
      method: "GET",
      dataType: "json",
      success: (response)=> {
        if(typeof(callback) === "undefined") console.log("no callback");
        else callback(response);
      },
      error: (error) => console.log(error),
    });
  }


  deleteOneRegister (types, id) {
    $.ajax ({
      url: this.BASE_URL + "/api/" + type + "/" + String(id),
      method: "DELETE",
      success: ()=> console.log(`${id} deleted`),
      error: (error) => console.log(error),
    });
  }

  updateOneRegister (types, id, userData) {
    $.ajax ({
      url: this.BASE_URL + "/api/" + type + "/" + String(id),
      method: "PATCH",
      data: userData,
      error: (error)=> console.log("patching failed")

    });
  }

}
