

$(document).ready(() => {
      $('#cliko').click(function(){
        $('.ui.modal').modal('show');   
    });
$('.ui.modal').modal('show'); 


    //update note

    $(".update-button").click(function () {
        let id = $(this).parent().attr("id");
        let title = $("#" + id + " .note-title").val();
        let content = $("#" + id + " .note-content").val();
        console.log("Posting: ",title, content);
        $.ajax({
            url: `/notes/${id}`,
            method: 'put',
            data: {id, title, content}
        });
    });  
    
    //delete note
    $(".delete-button").click(function () {
        let id = $(this).parent().attr("id");
        $("#" + id).hide();
        $.ajax({
            url: "/notes/delete",
            method: 'DELETE',
            data: {"id": id}
        });
    });   
    
    
});