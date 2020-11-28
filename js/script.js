// saat mengklik link di navbar
$('.page-scroll').on('click', function (e) {

	// mengambil isi href
	var tujuan = $(this).attr('href');
	// tangkap isi
	var elemenTujuan = $(tujuan);

	//pindahkan scroll
	$('html , body').animate({
		scrollTop: elemenTujuan.offset().top - 50
	}, 1300, 'easeOutBounce');


	e.preventDefault();

});