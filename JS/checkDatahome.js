let rawData = localStorage.getItem('dataUser');

if (!rawData) {
    // rawData là null hoặc empty string hoặc undefined
    console.log('no data');
    window.location.href = '../index.html';
} else {
    try {

        console.log('have data');

    } catch(e) {
        console.error('JSON parse error:', e);

        window.location.href = '../index.html';
    }
}