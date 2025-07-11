import supabase from "./supabase"


export async function signup({fullName, email, password}){
  const {data, error} = await supabase.auth.signUp({
    email, password, options:{
      data:{
        fullName,
        avatar:"",
      }
    }
  })
  if (error) throw new Error(error.message)
    return data.user;
}


export async function login({email, password}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  // console.log(data)
  return data
}



export async function getCurrentUser() {
  const { data: session, error: sessionError } = await supabase.auth.getSession();

  console.log("Session:", session);

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  console.log("User:", data.user);

  return data?.user;
}
