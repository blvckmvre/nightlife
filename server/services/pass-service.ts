import bcrypt from "bcryptjs";

class PassService {
    async hashPassword(password: string) {
        try {
            const hash = await bcrypt.hash(password, 12);
            return hash;
        } catch(e) {
            throw e;
        }
    }
    async verifyPassword(input: string, stored: string) {
        try {
            const isValid = await bcrypt.compare(input, stored);
            return isValid;
        } catch(e) {
            throw e;
        }
    }
}

export default new PassService();