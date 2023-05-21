async function updateOrder(id) {
	const response = await fetch(`/order/${id}`, { method: 'PUT' });
	// console.log(id);
	window.location.href = '/order';
}
