
function registro() {
    var codigo = document.getElementById('codigo');
    var nombres = document.getElementById('nombres');
    var apellidos = document.getElementById('apellidos');
    registrar(codigo.value, nombres.value, apellidos.value);
    location.reload();
};

function deleteop(codigo){
    $.ajax({
        url:'http://localhost:8000/estudiantes/'+id,
        method: 'delete',
    }).done(response=>{
        alert(response);
        location.reload();
    });
    }

function registrar(codigo, nombres, apellidos) {
    $.ajax({
        url:'http://localhost:8000/estudiantes',
        method: 'post',
        data:{
                codigo: codigo,
                nombres: nombres,
                apellidos: apellidos
        }
    }).done(response=>{
        let dataJson = JSON.parse(response);
        const msg = dataJson.data;
        alert(msg);
        console.log(response)
    });
}


$(document).ready(function(){
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/estudiantes'
    }).done((response)=>{
        const dataJson = JSON.parse(response);
        const estudiantes = dataJson.data;
        const table = document.getElementById('estudiantesTb');
        const tbody = table.getElementsByTagName('tbody')[0];
        let html = '';
        estudiantes.forEach(estudiante=>{
            html +='<tr>';
            html +='    <td>'+ estudiante.codigo +'</td>';
            html +='    <td>'+ estudiante.nombres+ '</td>';
            html +='    <td>'+ estudiante.apellidos+ '</td>';
            html +='    <td>';
             html +='       <button onclick="modificar('+estudiante.codigo+')">Modificar</button>';
             html +='   </td>';
             html +='   <td>';
             html +='       <button onclick="deleteop('+estudiante.codigo+')">Eliminar</button>';
             html +='   </td>';
             html +='   <td>';
             html +='   <a href="notasindex.html">notas</a>';
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