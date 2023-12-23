import { PrismaClient } from '@prisma/client';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const prisma = new PrismaClient();

	const { email, name } = await request.json();

	try {
		const isExisting = await prisma.user.findFirst({
			where: {
				email: email
			}
		});

		if (isExisting) {
			throw error(409, 'The user already exists');
		}

		const isAdded = await prisma.user.create({
			data: {
				email,
				name
			}
		});

		if (!isAdded) {
			throw error(500, 'Error in creating user');
		}
	} catch (e) {
		throw error(500, e);
	} finally {
		prisma.$disconnect();
	}
	return json({ message: 'You have created a user' }, { status: 201 });
}
