import {db} from '@/lib/db';

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    console.error('Error fetching account by user ID:', error);
    return null;
  }
};
