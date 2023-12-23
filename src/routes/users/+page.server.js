import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const prisma = new PrismaClient();
	let users;

	try {
		users = await prisma.user.findMany();
	} catch (e) {
		throw new error(500, e);
	} finally {
		prisma.$disconnect();
	}

	return {
		users: users
	};
}
