const fetchUser = async () => {
  try {
    const response = await fetch("/api/data");

    return await response.json();
  } catch (error) {
    return { error };
  }
};

export default fetchUser;
