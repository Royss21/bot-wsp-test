

export const agentes = [
    { 
        name: "[EMPLOYEE_WELCOME]",
        description: "Hola soy Kiara, me encargare de atenderte en primera instancia para la solicitud que desees crear.",
        flows: 0
    },
    { 
        name: "[EMPLOYEE_HELPDESK]",
        description: "Saludos mi nombre es Juan, te ayudare en el proceso de la creacion de tu solicitud, te brindare repsuestas breves y concisas para un registro flexible.",
        flows: 1
    },
    { 
        name: "[EMPLOYEE_SUPPORT_TICKET]",
        description: "Gusto en saludarte , mi nombre es Jennifer, sere responsable de ayudarte en brindarte los estados de tus solicitudes.",
        flows: 2
    },
]

export const colaboradores = [
    { numero: "980444507", nombre: "Royss Hugo" },
    { numero: "989019533", nombre: "Lorenzo Padilla" },
    { numero: "953179901", nombre: "mi bonita Koala ❤" },
    { numero: "977641658", nombre: "Marielena" },
]

export const opcionesBienvenido = {
    CREAR_TICKET: 1,
    HISTORIAL_TICKET: 2,
    HABLAR_CON_ALGUIEN: 3
}

export const historialTickets = [
    { 
        ticket: "RDBADA-2023-0001", 
        estado: "EN PROCESO", 
        titulo: "Error en carga del crmcloud" 
    },
    { 
        ticket: "RDDDAAS-2023-0025", 
        estado: "RESUELTO", 
        titulo: "Pasarela no funciona" 
    },
    { 
        ticket: "RTSDSDS-2023-1211", 
        estado: "CERRADO", 
        titulo: "Solicitud de homologacion de base de datos." 
    },
]
