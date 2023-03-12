import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(500).json("Укажите почту и пароль")
        return
    }
    const formData = new FormData();
    formData.append("adduser", "1");
    formData.append("priority", "2");
    formData.append("uplid", "1");
    formData.append("newpass", password);
    formData.append("newemail", email);
    formData.append("inhouse_billing", "1");
    formData.append("num_users", "2");
    formData.append("space", "150");
    formData.append("ram", "8192");
    formData.append("burst", "1024");
    formData.append("bandwidth", "200");
    formData.append("cores", "4");
    formData.append("space_per_vm", "20");
    formData.append("cpu_percent", "40");
    formData.append("num_ipv4", "5");
    formData.append("txt_service_period", "1");
    formData.append("allowed_virts[]", "kvm");
    const response = await fetch(`https://churkahost.float-zone.com:4085/index.php?act=adduser&api=json&adminapikey=${process.env.API_KEY}&adminapipass=${process.env.KEY_PASS}`,
        {
        method: "POST",
        //     headers:{
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
            // @ts-ignore
        body: formData
        }
        )
    const json = await response.json();
    console.log(json)
    if(json.error){
        const error = json.error[0]
        if(error === "The Email Address already exists"){
            res.status(500).json({message:"Такая почта уже зарегистрирована"});
        }else if(error === "Email address you entered is not valid"){
            res.status(500).json({message:"Некорректный формат почты"});
        }else{
            res.status(500).json({message: "Ошибка"});
        }
        return
    }
    res.json("user add")
}
