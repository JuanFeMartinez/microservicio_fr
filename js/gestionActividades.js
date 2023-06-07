function registroNotas() {
    var id = document.getElementById('id');
    var descripcion = document.getElementById('descripcion');
    var nota = document.getElementById('nota');
    var codigoEstudiante = document.getElementById('codigoEstudiante');
    registrar(id.value, descripcion.value, nota.value, codigoEstudiante.value)
    location.reload();
};

function deleteopNotas(id){
    $.ajax({
        url:'http://localhost:8000/actividades/'+id,
        method: 'delete',
    }).done(response=>{
        alert(response);
        location.reload();
    });
    }

function registrar(id, descripcion, nota, codigoEstudiante) {
    $.ajax({
        url:'http://localhost:8000/actividades',
        method: 'post',
        data:{
                id: id,
                descripcion: dexcripcion,
                nota: nota,
                codigoEstudiante: codigoEstudiante
        }
    }).done(response=>{
        const dataJson = JSON.parse(response);
        const msg = dataJson.data;
        alert(msg);
    });
}



$(document).ready(function(){
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/actividades'
    }).done((response)=>{
        const dataJson = JSON.parse(response);
        const usuarios = dataJson.data;
        const table = document.getElementById('actividadessTb');
        const tbody = table.getElementsByTagName('tbody')[0];
        let html = '';
        usuarios.forEach(actividad=>{
            html +='<tr>';
            html +='    <td>'+ actividad.id +'</td>';
            html +='    <td>'+ actividad.descripcion + '</td>';
            html +='    <td>'+ actividad.nota + '</td>';
            html +='    <td>';
             html +='       <button onclick="modificar('+actividad.id+')">Modificar</button>';
             html +='   </td>';
             html +='   <td>';
             html +='       <button onclick="deleteopNotas('+actividad.id+')">Eliminar</button>';
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