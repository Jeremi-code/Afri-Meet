import { useToast } from "#imports";
export function useCustomToast(message: string, status: string) {
    const toast = useToast()
    if (status == "ok") {
        toast.add({
            title: message,
            color: 'green',
            icon: 'i-heroicons-check-circle',
            ui: {
                backgroundColor: 'green'
            }
        })
    } else {
        toast.add({
            title: message,
            color: 'red',
            icon: "i-heroicons-x-mark",
            ui: {
                backgroundColor: "bg-red-100"

            }
        });
    }
}