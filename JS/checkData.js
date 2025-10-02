let checkData  = JSON.parse(localStorage.getItem('dataUser'));

if(checkData === null){

    console.log('no data');
    window.location.href = '../../index.html';

}else{
    console.log('have data');
}