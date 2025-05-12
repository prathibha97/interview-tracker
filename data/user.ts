import { db } from '@/lib/db';
import { UserRole } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';

export async function getUserByEmail(email: string) {
  try {
    const user = await db?.user?.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db?.user?.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

export async function createUser({
  name,
  email,
  password,
  role = UserRole.USER,
}: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return db?.user?.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
}
