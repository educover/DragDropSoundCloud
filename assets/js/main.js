SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
})

let pintarImagen=(tracks, i)=>`<div class='imagen_mini col-2 img'><img src=
${tracks[i].artwork_url} id = ${tracks[i].id} draggable='true' ondragstart='onDragStart(event)'></div>
`
let pintarImagenDefecto=(tracks, i)=>`<div class='imagen_mini col-2 img'><img src=
'./assets/imag/img_r.jpg' id = ${tracks[i].id} draggable='true' ondragstart='onDragStart(event)'></div>
`

function miFunc() {
    let val = $('input').val();
    $('input').val('');
    SC.get('/tracks', {
        q:val
    }).then(function(tracks){
        for (let i = 0; i < 10; i++) {
            if(tracks[i].artwork_url===null){
                $('.music').append(pintarImagenDefecto(tracks, i));
            } else {
            $('.music').append(pintarImagen(tracks, i));
            }
            console.log(tracks);
        }
    });
}

function onDragOver(e){
    e.preventDefault();
}

function onDragStart(e, miMusic){
    console.log(miMusic)
    e.dataTransfer.setData('id', e.target.id);
    //console.log(e.dataTransfer);

}

function onDrop(e){
   // console.log(e)
    var data = e.dataTransfer.getData('id');
    e.target.appendChild(document.getElementById(data));
    SC.stream('/tracks/'+data)
    .then(function(player){
    player.play();
    }
    
    )}




