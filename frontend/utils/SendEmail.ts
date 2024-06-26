const sendMeetingEmail = async (to:string,subject:string,html:string) => {
    try {
        console.log(to,subject,html)
        const result = await $fetch('/api/send', {
            method : 'POST',
            body : {
                to,
                subject,
                html,
            },
        }) 
        if (result.error) {
            console.log('Error sending emial:',result.error)
        } else {
            console.log('Email sent successfully')
        }
    } catch (err:any) {
        console.error('unexpected error sending email')
        return {success : false , error: err.message}
    }
};

export default sendMeetingEmail