function deleteop(id){
    $.ajax({
        url:'http://localhost:8000/usuarios/'+id,
        method: 'delete',
    }).done(response=>{
        alert(response);
        location.reload();
    });
    }

function registrar(nombre, usuario, contra) {
    $.ajax({
        url:'http://localhost:8000/usuarios',
        method: 'post',
        data:{
                name: nombre,
                username: usuario,
                password: contra
        }
    }).done(response=>{
        const dataJson = JSON.parse(response);
        const msg = dataJson.data;
        alert(msg);
    });
}

function registro() {
    var name = document.getElementById('nombre');
    var username = document.getElementById('usuario');
    var password = document.getElementById('password');
    registrar(name.value, username.value, password.value)
    location.reload();
};

$(document).ready(function(){
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/usuarios'
    }).done((response)=>{
        const dataJson = JSON.parse(response);
        const usuarios = dataJson.data;
        const table = document.getElementById('usuariosTb');
        const tbody = table.getElementsByTagName('tbody')[0];
        let html = '';
        usuarios.forEach(usuario=>{
            html +='<tr>';
            html +='    <td>'+ usuario.name +'</td>';
            html +='    <td>'+ usuario.username+ '</td>';
            html +='    <td>';
             html +='       <button>Modificar</button>';
             html +='   </td>';
             html +='   <td>';
             html +='       <button onclick="deleteop('+usuario.id+')">Eliminar</button>';
             html +='   </td>';
             html +='</tr>';
        });
        tbody.innerHTML = html;
    }).fail((error)=>{
        console.error(error);
    });

    //Funcionalidad para registrar un usuario



    $.ajax({
        url:'http://localhost:8000/usuarios/2',
        method: 'put',
        data:{
                name: 'Admin 1',
                username: 'admin 1',
                password: '3210'
        }
    }).done(response=>{
        const dataJson = JSON.parse(response);
        const msg = dataJson.data;
        alert(msg);
    });
});