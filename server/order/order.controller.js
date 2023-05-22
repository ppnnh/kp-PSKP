import prisma from '../index.js';

async function addOrder(req, resp) {
	try {
		console.log(req.body);
		const { orderTopizza, drinkToorder, totalPrice, pizzeria } = req.body;
		console.log(drinkToorder);
		const order = await prisma.order.create({
			data: {
				orderTopizza: {
					create: orderTopizza,
				},
				drinkToorder: {
					create: drinkToorder,
				},
				totalPrice: parseFloat(totalPrice),
				client: {
					connect: {
						id: req.user.id,
					},
				},
				pizzeria: {
					connect: {
						id: +pizzeria,
					},
				}
			},
		});
		resp.json(order);
	} catch (err) {
		resp.json(err.message);
		resp.status(401);
		console.log(err);
	}
}

async function getOrders(req, resp) {
	if (req.user.role === 'admin') {
		let adminOrders = await prisma.order.findMany({
			select: {
				drinkToorder: {
					select: {
						drink: true,
						quantity: true,
					},
				},
				orderTopizza: {
					select: {
						pizza: true,
						quantity: true,
					},
				},
				id: true,
				totalPrice: true,
				status: true,
                pizzeria: true,
				date: true
			},
		});
		if (!adminOrders) {
			resp.render('error.hbs', { error: 'There are no orders' });
		} else {
			resp.render('adminOrder.hbs', {
				orders: adminOrders,
			});
		}
	}
	let orders = await prisma.order.findMany({
		where: {
			client: {
				id: req.user.id,
			},
		},
		select: {
			drinkToorder: {
				select: {
					drink: true,
					quantity: true,
				},
			},
			orderTopizza: {
				select: {
					pizza: true,
					quantity: true,
				},
			},
			totalPrice: true,
			status: true,
            pizzeria: true
		},
	});
	if (!orders) {
		resp.render('error.hbs', { error: 'There are no orders' });
	} else {
		resp.render('order.hbs', {
			orders: orders,
		});
	}
}

async function completeOrder(req, resp) {
	try {
		const { orderTopizza, drinkToorder, totalPrice } = req.body;
		const order = await prisma.order.update({
			where: {
				id: +req.params.id,
			},
			data: {
				status: "Ready",
			},
		});
		resp.json(order);
		// resp.redirect(303, '/order');
	} catch (err) {
		resp.json(err.message);
		resp.status(401);
		console.log(err);
	}
}

export default { addOrder, getOrders, completeOrder };
