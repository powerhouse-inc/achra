import 'server-only'

import type { ServiceRequestData } from '../types'

async function sendServiceRequest(data: ServiceRequestData): Promise<boolean> {
  try {
    // TODO: Replace with actual email sending logic
    // await resend.emails.send({
    //   from: 'noreply@yourdomain.com',
    //   to: 'sales@yourdomain.com',
    //   subject: `New Service Request from ${data.name}`,
    //   html: generateEmailTemplate(data),
    // })

    // Keep for testing and  Remove this once actual implementation is done
    console.log('📧 Service Request Submitted:', {
      name: data.name,
      teamName: data.teamName,
      email: data.email,
      selectedPlan: data.selectedPlan,
      enabledSections: data.enabledSections,
      configuration: data.configuration,
    })

    // Simulate network delay for testing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return true
  } catch (error) {
    console.error('Failed to send service request:', error)
    return false
  }
}

export { sendServiceRequest }
