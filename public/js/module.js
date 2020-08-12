import Swal from '/sweetalert2/src/sweetalert2.js';
export const messageSuccess = (message) => {
    Swal.fire({
        title: 'Success',
        text: message,
        icon: 'success'
    });
}

export const messageError = (message) => {
    Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error'
    });
}

export const messageDelete = (id, classParent, url) => {
    Swal.fire({
        title: 'Are you sure delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function(result) {
                    if (result.message === true) {
                        $('#' + classParent).remove();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                    }
                },
                error: function (request, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      });
                }
            });
        }
      });
    }
export const messageWarning = (message) => {
    Swal.fire({
        title: 'Warning',
        text: message,
        icon: 'warning'
    });
}

export const messageExcel = (value) => {
   var errors = JSON.parse(unescape(value));
   console.log(errors);
   
   var html = `<div class='card card-secondary'>
                    <div class='card-header'>
                        <h3 class='card-title'>Errors import Excel</h3>
                    </div>
                <div class='card-body'>`;
   errors.forEach( (element, index, arr) => {
       if (element) {       
            html += `
            <div class='row'>
                <div class='col-sm-12' style='text-align: left'>
                <div class='form-group'>
                    <label>line ${index}:</label>
                    ${element.firstName !== undefined ? '<p>firstName: ' + element.firstName + '</p>': ''}
                    ${element.lastName !== undefined ? '<p>lastName: ' + element.lastName + '</p>': ''}
                    ${element.email !== undefined ? '<p>email: ' + element.email + '</p>': ''}
                    ${element.role !== undefined ? '<p>role: ' + element.role + '</p>': ''}
                    ${element.password !== undefined ? '<p>password: ' + element.password + '</p>': ''}
                    ${element.delFlg !== undefined ? '<p>delFlg: ' + element.delFlg + '</p>': ''}
                </div>
                </div>
            </div>`;
       }
   });
   html += `</div></div>`;
   errors.forEach( (element, index) => {
    console.log(element);
    console.log(index);
    
   });

    Swal.fire({
        html: html,
        imageHeight: 1500,
        imageAlt: 'A tall image'
      })
}