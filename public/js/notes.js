$(document).ready(() => {
    let updateNoteId = "";
    
    $("#add-note-icon").click(() => {
       $("#add-note-modal").modal('show'); 
    });
    
    $(".note").click(() => {
        console.log($(this).attr("id"));
        $("#update-note-modal").modal({
            onHidden: () => {}
        }).modal('show')
    });
    
    $('#update-note-modal').modal({
            onHidden: function() {
                alert('here');
            }
    });
    
    $("#update-note-button").click(function () {
        
        // let id = $(this).parent().attr("id");
        // let title = $("#" + id + " .note-title").val();
        // let content = $("#" + id + " .note-content").val();
        // console.log("Posting: ",title, content);
        // $.ajax({
        //     url: `/notes/${id}`,
        //     method: 'put',
        //     data: {id, title, content}
        // });
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