import { PrismaClient } from '@prisma/client';
import { error, json } from '@sveltejs/kit';

export async function PUT({ params, request }) {
	const prisma = new PrismaClient();

	const id = params.id;
	const { email, name } = request.json();

	let isCompleted = false;
	let status = 500;
	try {
		const isExisting = await prisma.user.findUnique({ where: { id: id } });

		if (isExisting) {
			isCompleted = await prisma.user.update({ data: { email: email, name: name } });
			status = 204;
		} else {
			isCompleted = await prisma.user.create({ data: { email: email, name: name } });
			status = 201;
		}
	} catch (e) {
		throw new error(500, e);
	} finally {
		prisma.$disconnect();
	}

	return isCompleted
		? json({ message: 'You have updated a user' }, { status: status })
		: new error(500, 'There was an error in updating the user');
}

export async function PATCH({ params, request }) {
	const prisma = new PrismaClient();

	const id = params.id;
	const { email, name } = request.json();

	let isCompleted = false;
	try {
		const isExisting = await prisma.user.findUnique({ where: { id: id } });

		if (!isExisting) {
			throw new error(404, 'The user does not exist');
		}

		isCompleted = await prisma.user.create({ data: { email: email, name: name } });
	} catch (e) {
		throw new error(500, e);
	} finally {
		prisma.$disconnect();
	}

	return isCompleted
		? json({ message: 'You have updated a user' }, { status: 200 })
		: new error(500, 'There was an error in updating the user');
}

export async function DELETE({ params }) {
	const prisma = new PrismaClient();

	const id = params.id;
	let isCompleted = false;
	try {
		const isExisting = await prisma.user.findUnique({ where: { id: id } });

		if (!isExisting) {
			throw new error(404, 'The user does not exist');
		}

		isCompleted = await prisma.user.delete({ where: { id: id } });
	} catch (e) {
		throw new error(500, e);
	} finally {
		prisma.$disconnect();
	}

	return isCompleted
		? json({ message: 'You have deleted a user' }, { status: 200 })
		: new error(500, 'There was an error in deleting the user');
}
