const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user

  getAll() {
    const users = UserRepository.getAll();
    return users;
  }

  getById(id) {
    const user = this.search({ id });
    if (!user) throw new Error("User not found");
    return user;
  }

  update(id, data) {
    const user = UserRepository.update(id, data);
    if (!user) throw new Error("Can not update user");
    return user;
  }

  create(data) {
    const { email, phoneNumber } = data;
    if (!!this.search({ email }) || !!this.search({ phoneNumber })) {
      throw new Error("Email or phone number is already registered");
    }
    const user = UserRepository.create(data);
    return user;
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
