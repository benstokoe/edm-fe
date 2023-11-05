const fetchUser = async (username: string, password: string) => {
  try {
    const response = await fetch("/api/user", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ username, password }),
    });

    return await response.json();
  } catch (error) {
    return { error };
  }
};

export default fetchUser;
