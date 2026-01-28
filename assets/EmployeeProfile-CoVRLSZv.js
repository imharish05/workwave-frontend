import{r as i,c as x,u as b,i as j,b as g,j as e,N as f,a as r,d as N,k as y,m as v,n as w,o as C}from"./index-DLoigD9o.js";const J=()=>{const[k,A]=i.useState(!1),[E,L]=i.useState(null),s=x(t=>t.employee),c=x(t=>t.auth.user.email),n=b();if(!s?.userName)return null;const o=s.userName.trim().split(/\s+/),d=o[0]?.[0]?.toUpperCase()||"",m=o[1]?.[0]?.toUpperCase()||"";i.useEffect(()=>{j(n)},[n]);const p=g(),h=()=>{n(y()),n(v()),n(w()),n(C()),localStorage.clear(),p("/login",{replace:!0})},u=async()=>{try{const t=await N.get("/employee/resume/download",{responseType:"blob"}),l=window.URL.createObjectURL(new Blob([t.data])),a=document.createElement("a");a.href=l,a.setAttribute("download","resume.pdf"),document.body.appendChild(a),a.click(),a.remove()}catch(t){console.error("Failed to download resume:",t)}};return e.jsxs(e.Fragment,{children:[e.jsx(f,{}),e.jsx("div",{className:"w-full px-5 py-3 flex items-center justify-center",children:e.jsxs("div",{className:"xl:w-[55%] w-100 md:p-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{children:e.jsx("h1",{className:"md:text-3xl text-xl font-bold",children:s.userName.toUpperCase()})}),e.jsxs("div",{className:"w-15 h-15 md:w-25 md:h-25 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl font-semibold",children:[d,m]})]}),e.jsxs(r,{to:"/employee/edit-profile",className:"text-start py-5 flex items-center group",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("p",{className:"py-2 font-semibold",children:[e.jsx("i",{className:"bi bi-envelope-paper px-2"})," ",c]}),e.jsxs("p",{className:"py-2 font-semibold",children:[e.jsx("i",{className:"bi bi-telephone px-2"})," ",s.phone]}),e.jsxs("p",{className:"py-2 font-semibold",children:[e.jsx("i",{className:"bi bi-geo-alt px-2"}),s.location.cityState,", ",s.location.country]})]}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("i",{className:`\r
        bi bi-highlighter\r
        text-xl\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `})})]}),e.jsx("h1",{className:"text-start md:text-2xl text-lg font-semibold",children:"Resume"}),e.jsxs("div",{className:"py-5 flex group",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsx("i",{className:"bi bi-filetype-pdf text-5xl text-blue-600"}),e.jsxs("div",{className:"text-start ps-4",children:[e.jsx("p",{className:"text-md text-gray-600",children:"Resume"}),e.jsx("button",{onClick:u,className:"text-green-600 hover:bg-green-50 rounded",type:"button",children:"View Resume"})]})]}),e.jsx(r,{to:"/employee/resume",children:e.jsx("i",{className:"bi bi-highlighter text-xl self-end group-hover:text-blue-400"})})]}),e.jsxs("div",{className:"py-3",children:[e.jsx("h1",{className:"text-start md:text-2xl text-lg font-semibold",children:"Education"}),e.jsxs(r,{to:s.education.length>0?"/employee/edit-education":"/employee/education",className:"py-5 flex group",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsx("i",{className:"bi bi-mortarboard text-5xl text-blue-600"}),e.jsx("div",{className:"text-start flex items-center",children:e.jsx("div",{className:"text-md text-gray-600 ps-4",children:s.education.length>0?e.jsx("p",{className:"text-md text-gray-600 ps-4",children:s.education?.[0]?.degree?.toUpperCase()}):e.jsx("p",{children:"No Education added yet"})})})]}),s.education.length>0?e.jsx("i",{className:`\r
        bi bi-highlighter\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `}):e.jsx("i",{className:`\r
        bi bi-plus-lg\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `})]})]}),e.jsxs("div",{className:"py-3",children:[e.jsx("h1",{className:"text-start md:text-2xl text-lg font-semibold",children:"Skills"}),e.jsxs(r,{to:s.skill.length>0?"/employee/edit-skill":"/employee/skill",className:"py-5 flex group",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsx("i",{className:"bi bi-stars text-5xl text-blue-600"}),e.jsx("div",{className:"text-start flex items-center",children:e.jsx("div",{className:"text-md text-gray-600 ps-4",children:s.skill.length>0?e.jsx("ul",{children:s.skill.map((t,l)=>e.jsx("li",{children:t.name.charAt(0).toUpperCase()+t.name.slice(1).toLowerCase()},l))}):e.jsx("p",{children:"No skills added yet"})})})]}),s.skill.length>0?e.jsx("i",{className:`\r
        bi bi-highlighter\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `}):e.jsx("i",{className:`\r
        bi bi-plus-lg\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `})]})]}),e.jsxs("div",{className:"py-3",children:[e.jsx("h1",{className:"text-start md:text-2xl text-lg font-semibold",children:"Experience"}),e.jsxs(r,{to:s.experience.length>0?"/employee/edit-experience":"/employee/experience",className:"py-5 flex group",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsx("i",{className:"bi-list-stars text-5xl text-blue-600"}),e.jsx("div",{className:"text-start flex items-center",children:e.jsx("div",{className:"text-md text-gray-600 ps-4",children:s.experience.length>0?s.experience.map((t,l)=>e.jsx("p",{children:t.company.charAt(0).toUpperCase()+t.company.slice(1).toLowerCase()},l)):e.jsx("p",{children:"No Experience Added"})})})]}),s.experience.length>0?e.jsx("i",{className:`\r
        bi bi-highlighter\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `}):e.jsx("i",{className:`\r
        bi bi-plus-lg\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `})]})]}),e.jsxs("div",{className:"py-3",children:[e.jsx("h1",{className:"text-start md:text-2xl text-lg font-semibold",children:"Certificates"}),e.jsxs(r,{to:s.certifications?.length>0?"/employee/edit-certificate":"/employee/certificates",className:"py-5 flex group",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsx("i",{className:"bi bi bi-award text-5xl text-blue-600"}),e.jsx("div",{className:"text-start flex items-center",children:e.jsx("div",{className:"text-md text-gray-600 ps-4",children:s.certifications?.length>0?s.certifications.map((t,l)=>e.jsx("p",{children:t.name.charAt(0).toUpperCase()+t.name.slice(1).toLowerCase()},l)):e.jsx("p",{children:"No Certifications Added"})})})]}),s.certifications?.length>0?e.jsx("i",{className:`\r
        bi bi-highlighter\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `}):e.jsx("i",{className:`\r
        bi bi-plus-lg\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `})]})]}),e.jsxs("div",{className:"py-3",children:[e.jsx("h1",{className:"text-start md:text-2xl text-lg font-semibold",children:"Job Preferences"}),e.jsxs(r,{to:s.jobPreferences?.length>0?"/employee/edit-job-preference":"/employee/job-preferences",className:"py-5 flex group",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsx("i",{className:"bi bi-person-workspace text-5xl text-blue-600"}),e.jsx("div",{className:"text-start flex items-center",children:e.jsx("div",{className:"text-md text-gray-600 ps-4",children:s.jobPreferences?.length>0?e.jsx("ul",{children:e.jsx("ul",{children:s.jobPreferences.map((t,l)=>e.jsx("li",{children:t.jobTitle.join(", ")},l))})}):e.jsx("p",{children:"No job preferences added"})})})]}),s.jobPreferences?.length>0?e.jsx("i",{className:`\r
        bi bi-highlighter\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `}):e.jsx("i",{className:`\r
        bi bi-plus-lg\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `})]})]}),e.jsxs("div",{className:"py-3",children:[e.jsx("h1",{className:"text-start md:text-2xl text-lg font-semibold",children:"Languages"}),e.jsxs(r,{to:s.languages.length>0?"/employee/edit-language":"/employee/language",className:"py-5 flex group",children:[e.jsxs("div",{className:"flex flex-1",children:[e.jsx("i",{className:"bi bi-translate text-5xl text-blue-600"}),e.jsx("div",{className:"text-start flex items-center",children:e.jsx("div",{className:"text-md text-gray-600 ps-4",children:s.languages.length>0?s.languages.map((t,l)=>e.jsx("div",{children:e.jsx("p",{children:t.name.charAt(0).toUpperCase()+t.name.slice(1).toLowerCase()},l)},l)):e.jsx("p",{children:"No Language Added"})})})]}),s.languages.length>0?e.jsx("i",{className:`\r
        bi bi-highlighter\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `}):e.jsx("i",{className:`\r
        bi bi-plus-lg\r
        text-xl\r
        self-end\r
        transition-transform duration-300 ease-out\r
        group-hover:text-blue-400\r
      `})]})]}),e.jsxs("section",{className:"py-2 text-start",children:[e.jsx("h1",{className:"md:text-2xl text-lg font-semibold",children:"Jobs Applied"}),e.jsxs(r,{to:s.appliedJobs?.length>0?"/employee/applied-jobs":"/employee/all-jobs",className:"pt-5 flex group",children:[e.jsxs("div",{className:"flex-1 flex items-center",children:[e.jsx("i",{className:"bi bi-joystick text-blue-600 text-5xl"}),s.appliedJobs.length>0?e.jsxs("p",{className:"ps-3",children:[s.appliedJobs.length," job(s) applied"]}):e.jsx("p",{children:"Not Applied to jobs yet"})]}),e.jsx("i",{className:`bi ${s.appliedJobs.length>0?"bi-highlighter":"bi-plus-lg"} text-xl group-hover:text-blue-400`})]})]}),e.jsx("div",{className:"mt-10 pt-6 border-t",children:e.jsxs("button",{type:"button",onClick:()=>{h()},className:`\r
      w-full\r
      flex\r
      items-center\r
      justify-center\r
      gap-2\r
      rounded-xl\r
      border\r
      border-red-500\r
      px-4\r
      py-3\r
      text-red-600\r
      font-semibold\r
      transition-all\r
      duration-200\r
      hover:bg-red-500\r
      hover:text-white\r
      active:scale-[0.98]\r
      focus:outline-none\r
      focus:ring-2\r
      focus:ring-red-400\r
    `,children:[e.jsx("i",{className:"bi bi-box-arrow-right text-lg"}),"Log out"]})})]})})]})};export{J as default};
