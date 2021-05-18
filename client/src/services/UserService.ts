import { IUser } from "../common/types";

const APIRoute = "http://localhost:8000";

export async function SignUpAPI(name: string, email: string, password: string) {
  try {
    const req = await fetch(`${APIRoute}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return req.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function SignInAPI(email: string, password: string) {
  try {
    const req = await fetch(`${APIRoute}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return req.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export const ChangePasswordAPI = async (
  userId: number,
  password: string,
  newPassword: string
) => {
  try {
    console.log("inside changepasswordapi");
    console.log(password, newPassword);
    const req = await fetch(`${APIRoute}/auth/changepassword/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify({ password, newPassword }),
    });
    return req.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const isAuth = async () => {
  try {
    const req = await fetch(`${APIRoute}/auth/verify`, {
      method: "POST",
      headers: {
        token: localStorage.token,
      },
    });
    return await req.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function DeleteAccount(userId: number) {
  await fetch(`${APIRoute}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export const ChangeDetails = async (
  userId: number,
  name: string,
  email: string
) => {
  await fetch(`${APIRoute}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
    body: JSON.stringify({ name, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
