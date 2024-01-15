//Time Conversion Code
const now = ref(new Date())
const displayTimeSince = (startDate) => {
    const date = new Date(startDate)
    const diffInSeconds = computed(() => Math.floor((now.value - date) / 1000))
    
    const days = computed(() => Math.floor(diffInSeconds.value / 86400))
    const hours = computed(() => Math.floor((diffInSeconds.value  % 86400) / 3600))
    const minutes = computed(() => Math.floor((diffInSeconds.value % 86400) / 60))
    const seconds = computed(() => diffInSeconds.value % 60)
    const timePassedString = computed(() => {
        if (days.value > 0 ) {
            return `${days.value} day${days.value > 1 ? 's' : ''} ago`
        } else if (hours.value > 0 ) {
            return `${hours.value} hour${hours.value > 1 ? 's' : ''} ago`
        } else if (minutes.value > 0 ) {
            return `${minutes.value} minute${minutes.value > 1 ? 's' : ''} ago`
        } else {
            return `${seconds.value} second${seconds.value > 1 ? 's' : ''} ago`
        }
    })
    return timePassedString.value
}
onMounted(() => {
    window.setInterval(() => {
        now.value = new Date();
    }, 60000)
})