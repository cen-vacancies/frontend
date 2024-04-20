/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/health/check': {
    /** Check health */
    get: operations['CenWeb.HealthCheckController.check']
  }
  '/api/organizations': {
    /** Create organization */
    post: operations['CenWeb.OrganizationController.create']
  }
  '/api/organizations/{organization_id}': {
    /** Get organization */
    get: operations['CenWeb.OrganizationController.show']
    /** Delete organization */
    delete: operations['CenWeb.OrganizationController.delete']
    /** Update organization */
    patch: operations['CenWeb.OrganizationController.update']
  }
  '/api/organizations/{organization_id}/new_vacancy': {
    /** Create vacancy */
    post: operations['CenWeb.VacancyController.create']
  }
  '/api/tokens': {
    /** Get access token */
    post: operations['CenWeb.TokenController.create']
  }
  '/api/users': {
    /** Create user */
    post: operations['CenWeb.UserController.create']
  }
  '/api/users/me': {
    /** Get user by ID */
    get: operations['CenWeb.UserController.show']
    /** Delete user */
    delete: operations['CenWeb.UserController.delete']
  }
  '/api/users/me/info': {
    /** Update user */
    patch: operations['CenWeb.UserController.update_info']
  }
  '/api/vacancies/search': {
    /** Search vacancies */
    get: operations['CenWeb.VacancyController.search']
  }
  '/api/vacancies/{vacancy_id}': {
    /** Get vacancy */
    get: operations['CenWeb.VacancyController.show']
    /** Delete vacancy */
    delete: operations['CenWeb.VacancyController.delete']
    /** Update vacancy */
    patch: operations['CenWeb.VacancyController.update']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    /**
     * ChangesetErrorsResponse
     * @example {
     *   "errors": {
     *     "password": [
     *       "too short"
     *     ]
     *   }
     * }
     */
    ChangesetErrorsResponse: {
      /** @description Errors map. Keys are fields and values are array of errors */
      errors: {
        [key: string]: unknown
      }
    }
    /**
     * CreateOrganizationRequest
     * @example {
     *   "organization": {
     *     "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
     *     "contacts": "+78005553535",
     *     "description": "applicant",
     *     "logo": "/uploads/urfu.png",
     *     "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
     *   }
     * }
     */
    CreateOrganizationRequest: {
      organization: {
        address: string
        contacts: string
        description: string
        logo?: string
        name: string
      }
    }
    /**
     * CreateUserRequest
     * @example {
     *   "user": {
     *     "birth_date": "2000-01-01",
     *     "email": "username@domain.org",
     *     "fullname": "Иванов Иван Иванович",
     *     "password": "123456qwerty",
     *     "phone": "+78001234567",
     *     "role": "applicant"
     *   }
     * }
     */
    CreateUserRequest: {
      user: {
        /** Format: date */
        birth_date?: string
        email: string
        fullname: string
        password: string
        /** Format: phone */
        phone: string
        /** @enum {string} */
        role: 'applicant' | 'employer'
      }
    }
    /**
     * CreateVacancyRequest
     * @example {
     *   "vacancy": {
     *     "description": "Ищем очень хорошего работника!",
     *     "education": "higher",
     *     "employment_type": "main",
     *     "field_of_art": "other",
     *     "min_years_of_work_experience": 5,
     *     "proposed_salary": "20000",
     *     "title": "Работник",
     *     "work_schedule": "full_time"
     *   }
     * }
     */
    CreateVacancyRequest: {
      vacancy: {
        description: string
        /** @enum {string} */
        education: 'none' | 'higher' | 'secondary' | 'secondary_vocational'
        /** @enum {string} */
        employment_type: 'main' | 'secondary' | 'practice' | 'internship'
        /** @enum {string} */
        field_of_art: 'music' | 'visual' | 'performing' | 'choreography' | 'folklore' | 'other'
        /** @default 0 */
        min_years_of_work_experience?: number
        /** @default 0 */
        proposed_salary?: number
        title: string
        /** @enum {string} */
        work_schedule: 'full_time' | 'part_time' | 'remote_working' | 'hybrid_working' | 'flexible_schedule'
      }
    }
    /**
     * GenericErrorResponse
     * @example {
     *   "errors": {
     *     "detail": "Some error occurred"
     *   }
     * }
     */
    GenericErrorResponse: {
      errors: {
        /** @description Error reason */
        detail: string
      }
    }
    /**
     * HealthCheckResponse
     * @example {
     *   "status": "ok"
     * }
     */
    HealthCheckResponse: {
      /** @description API status */
      status: string
    }
    /**
     * Organization
     * @example {
     *   "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
     *   "contacts": "+78005553535",
     *   "description": "applicant",
     *   "employer": {
     *     "birth_date": "2000-01-01",
     *     "email": "username@domain.org",
     *     "fullname": "Иванов Иван Иванович",
     *     "id": "756",
     *     "phone": "+78001234567",
     *     "role": "employer"
     *   },
     *   "id": "756",
     *   "logo": "/uploads/urfu.png",
     *   "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
     * }
     */
    Organization: {
      address: string
      contacts: string
      description: string
      /**
       * User
       * @example {
       *   "birth_date": "2000-01-01",
       *   "email": "username@domain.org",
       *   "fullname": "Иванов Иван Иванович",
       *   "id": "756",
       *   "phone": "+78001234567",
       *   "role": "employer"
       * }
       */
      employer: {
        /** Format: date */
        birth_date: string | null
        email: string
        fullname: string
        id: number
        /** Format: phone */
        phone: string
        /** Format: employer */
        role: string
      }
      id: number
      logo: string
      name: string
    }
    /**
     * OrganizationResponse
     * @example {
     *   "data": {
     *     "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
     *     "contacts": "+78005553535",
     *     "description": "applicant",
     *     "employer": {
     *       "birth_date": "2000-01-01",
     *       "email": "username@domain.org",
     *       "fullname": "Иванов Иван Иванович",
     *       "id": "756",
     *       "phone": "+78001234567",
     *       "role": "employer"
     *     },
     *     "id": "756",
     *     "logo": "/uploads/urfu.png",
     *     "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
     *   }
     * }
     */
    OrganizationResponse: {
      /**
       * Organization
       * @example {
       *   "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
       *   "contacts": "+78005553535",
       *   "description": "applicant",
       *   "employer": {
       *     "birth_date": "2000-01-01",
       *     "email": "username@domain.org",
       *     "fullname": "Иванов Иван Иванович",
       *     "id": "756",
       *     "phone": "+78001234567",
       *     "role": "employer"
       *   },
       *   "id": "756",
       *   "logo": "/uploads/urfu.png",
       *   "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
       * }
       */
      data: {
        address: string
        contacts: string
        description: string
        /**
         * User
         * @example {
         *   "birth_date": "2000-01-01",
         *   "email": "username@domain.org",
         *   "fullname": "Иванов Иван Иванович",
         *   "id": "756",
         *   "phone": "+78001234567",
         *   "role": "employer"
         * }
         */
        employer: {
          /** Format: date */
          birth_date: string | null
          email: string
          fullname: string
          id: number
          /** Format: phone */
          phone: string
          /** Format: employer */
          role: string
        }
        id: number
        logo: string
        name: string
      }
    }
    /**
     * Page
     * @example {
     *   "page_number": 1,
     *   "page_size": 10,
     *   "total_entries": 23,
     *   "total_pages": 3
     * }
     */
    Page: {
      page_number: number
      page_size: number
      total_entries: number
      total_pages: number
    }
    /**
     * TokenResponse
     * @example {
     *   "data": {
     *     "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjZW4tdmFjYW5jaWVzIiwiZXhwIjoxNzE1MTA0ODc3LCJpYXQiOjE3MTI2ODU2NzcsImlzcyI6ImNlbi12YWNhbmNpZXMiLCJqdGkiOiJmMzk5ZmQzMC0yYjJhLTQ4ZjMtODE1ZC0zNWU4MzhhYjNiODciLCJuYmYiOjE3MTI2ODU2NzYsInN1YiI6IjEiLCJ0eXAiOiJhY2Nlc3MifQ.18NmnxCYERqKFu5O0VjY85qZsDkCHL0vy0uYJ1suFJPSjiZrNS2RGQobmE8mO9P5-MkyL-_-Kp4EwWvBnCUwyA"
     *   }
     * }
     */
    TokenResponse: {
      data: {
        /** Format: JWT */
        token: string
      }
    }
    /**
     * UpdateOrganizationRequest
     * @example {
     *   "organization": {
     *     "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
     *     "contacts": "+78005553535",
     *     "description": "applicant",
     *     "logo": "/uploads/urfu.png",
     *     "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
     *   }
     * }
     */
    UpdateOrganizationRequest: {
      organization: {
        address?: string
        contacts?: string
        description?: string
        logo?: string
        name?: string
      }
    }
    /**
     * UpdateUserInfoRequest
     * @example {
     *   "user": {
     *     "birth_date": "2000-01-01",
     *     "fullname": "Иванов Иван Иванович",
     *     "phone": "+78001234567"
     *   }
     * }
     */
    UpdateUserInfoRequest: {
      user: {
        /** Format: date */
        birth_date?: string
        fullname?: string
        /** Format: phone */
        phone?: string
      }
    }
    /**
     * UpdateVacancyRequest
     * @example {
     *   "vacancy": {
     *     "description": "Ищем очень хорошего работника!",
     *     "education": "higher",
     *     "employment_type": "main",
     *     "field_of_art": "other",
     *     "min_years_of_work_experience": 5,
     *     "proposed_salary": "20000",
     *     "title": "Работник",
     *     "work_schedule": "full_time"
     *   }
     * }
     */
    UpdateVacancyRequest: {
      vacancy: {
        description?: string
        /** @enum {string} */
        education?: 'none' | 'higher' | 'secondary' | 'secondary_vocational'
        /** @enum {string} */
        employment_type?: 'main' | 'secondary' | 'practice' | 'internship'
        /** @enum {string} */
        field_of_art?: 'music' | 'visual' | 'performing' | 'choreography' | 'folklore' | 'other'
        /** @default 0 */
        min_years_of_work_experience?: number
        /** @default 0 */
        proposed_salary?: number
        title?: string
        /** @enum {string} */
        work_schedule?: 'full_time' | 'part_time' | 'remote_working' | 'hybrid_working' | 'flexible_schedule'
      }
    }
    /**
     * User
     * @example {
     *   "birth_date": "2000-01-01",
     *   "email": "username@domain.org",
     *   "fullname": "Иванов Иван Иванович",
     *   "id": "756",
     *   "phone": "+78001234567",
     *   "role": "employer"
     * }
     */
    User: {
      /** Format: date */
      birth_date: string | null
      email: string
      fullname: string
      id: number
      /** Format: phone */
      phone: string
      /** Format: employer */
      role: string
    }
    /**
     * UserCredentials
     * @example {
     *   "user": {
     *     "email": "username@domain.org",
     *     "password": "123456qwerty"
     *   }
     * }
     */
    UserCredentials: {
      user: {
        email: string
        password: string
      }
    }
    /**
     * UserResponse
     * @example {
     *   "data": {
     *     "birth_date": "2000-01-01",
     *     "email": "username@domain.org",
     *     "fullname": "Иванов Иван Иванович",
     *     "id": "756",
     *     "phone": "+78001234567",
     *     "role": "applicant"
     *   }
     * }
     */
    UserResponse: {
      /**
       * User
       * @example {
       *   "birth_date": "2000-01-01",
       *   "email": "username@domain.org",
       *   "fullname": "Иванов Иван Иванович",
       *   "id": "756",
       *   "phone": "+78001234567",
       *   "role": "applicant"
       * }
       */
      data: {
        /** Format: date */
        birth_date: string | null
        email: string
        fullname: string
        id: number
        /** Format: phone */
        phone: string
        /** @enum {string} */
        role: 'admin' | 'applicant' | 'employer'
      }
    }
    /**
     * VacanciesQueryResponse
     * @example {
     *   "data": [
     *     {
     *       "description": "Ищем очень хорошего работника!",
     *       "education": "higher",
     *       "employment_type": "main",
     *       "field_of_art": "other",
     *       "id": "756",
     *       "min_years_of_work_experience": 5,
     *       "organization": {
     *         "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
     *         "contacts": "+78005553535",
     *         "description": "applicant",
     *         "employer": {
     *           "birth_date": "2000-01-01",
     *           "email": "username@domain.org",
     *           "fullname": "Иванов Иван Иванович",
     *           "id": "756",
     *           "phone": "+78001234567",
     *           "role": "employer"
     *         },
     *         "id": "756",
     *         "logo": "/uploads/urfu.png",
     *         "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
     *       },
     *       "proposed_salary": "20000",
     *       "published": true,
     *       "reviewed": true,
     *       "title": "Работник",
     *       "work_schedule": "full_time"
     *     }
     *   ],
     *   "page": {
     *     "page_number": 1,
     *     "page_size": 10,
     *     "total_entries": 23,
     *     "total_pages": 3
     *   }
     * }
     */
    VacanciesQueryResponse: {
      data: {
        description: string
        /** @enum {string} */
        education: 'none' | 'higher' | 'secondary' | 'secondary_vocational'
        /** @enum {string} */
        employment_type: 'main' | 'secondary' | 'practice' | 'internship'
        /** @enum {string} */
        field_of_art: 'music' | 'visual' | 'performing' | 'choreography' | 'folklore' | 'other'
        id: number
        /** @default 0 */
        min_years_of_work_experience: number
        /**
         * Organization
         * @example {
         *   "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
         *   "contacts": "+78005553535",
         *   "description": "applicant",
         *   "employer": {
         *     "birth_date": "2000-01-01",
         *     "email": "username@domain.org",
         *     "fullname": "Иванов Иван Иванович",
         *     "id": "756",
         *     "phone": "+78001234567",
         *     "role": "employer"
         *   },
         *   "id": "756",
         *   "logo": "/uploads/urfu.png",
         *   "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
         * }
         */
        organization: {
          address: string
          contacts: string
          description: string
          /**
           * User
           * @example {
           *   "birth_date": "2000-01-01",
           *   "email": "username@domain.org",
           *   "fullname": "Иванов Иван Иванович",
           *   "id": "756",
           *   "phone": "+78001234567",
           *   "role": "employer"
           * }
           */
          employer: {
            /** Format: date */
            birth_date: string | null
            email: string
            fullname: string
            id: number
            /** Format: phone */
            phone: string
            /** Format: employer */
            role: string
          }
          id: number
          logo: string
          name: string
        }
        proposed_salary: number | null
        published: boolean
        reviewed: boolean
        title: string
        /** @enum {string} */
        work_schedule: 'full_time' | 'part_time' | 'remote_working' | 'hybrid_working' | 'flexible_schedule'
      }[]
      /**
       * Page
       * @example {
       *   "page_number": 1,
       *   "page_size": 10,
       *   "total_entries": 23,
       *   "total_pages": 3
       * }
       */
      page: {
        page_number: number
        page_size: number
        total_entries: number
        total_pages: number
      }
    }
    /**
     * Vacancy
     * @example {
     *   "description": "Ищем очень хорошего работника!",
     *   "education": "higher",
     *   "employment_type": "main",
     *   "field_of_art": "other",
     *   "id": "756",
     *   "min_years_of_work_experience": 5,
     *   "organization": {
     *     "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
     *     "contacts": "+78005553535",
     *     "description": "applicant",
     *     "employer": {
     *       "birth_date": "2000-01-01",
     *       "email": "username@domain.org",
     *       "fullname": "Иванов Иван Иванович",
     *       "id": "756",
     *       "phone": "+78001234567",
     *       "role": "employer"
     *     },
     *     "id": "756",
     *     "logo": "/uploads/urfu.png",
     *     "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
     *   },
     *   "proposed_salary": "20000",
     *   "published": true,
     *   "reviewed": true,
     *   "title": "Работник",
     *   "work_schedule": "full_time"
     * }
     */
    Vacancy: {
      description: string
      /** @enum {string} */
      education: 'none' | 'higher' | 'secondary' | 'secondary_vocational'
      /** @enum {string} */
      employment_type: 'main' | 'secondary' | 'practice' | 'internship'
      /** @enum {string} */
      field_of_art: 'music' | 'visual' | 'performing' | 'choreography' | 'folklore' | 'other'
      id: number
      /** @default 0 */
      min_years_of_work_experience: number
      /**
       * Organization
       * @example {
       *   "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
       *   "contacts": "+78005553535",
       *   "description": "applicant",
       *   "employer": {
       *     "birth_date": "2000-01-01",
       *     "email": "username@domain.org",
       *     "fullname": "Иванов Иван Иванович",
       *     "id": "756",
       *     "phone": "+78001234567",
       *     "role": "employer"
       *   },
       *   "id": "756",
       *   "logo": "/uploads/urfu.png",
       *   "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
       * }
       */
      organization: {
        address: string
        contacts: string
        description: string
        /**
         * User
         * @example {
         *   "birth_date": "2000-01-01",
         *   "email": "username@domain.org",
         *   "fullname": "Иванов Иван Иванович",
         *   "id": "756",
         *   "phone": "+78001234567",
         *   "role": "employer"
         * }
         */
        employer: {
          /** Format: date */
          birth_date: string | null
          email: string
          fullname: string
          id: number
          /** Format: phone */
          phone: string
          /** Format: employer */
          role: string
        }
        id: number
        logo: string
        name: string
      }
      proposed_salary: number | null
      published: boolean
      reviewed: boolean
      title: string
      /** @enum {string} */
      work_schedule: 'full_time' | 'part_time' | 'remote_working' | 'hybrid_working' | 'flexible_schedule'
    }
    /**
     * VacancyResponse
     * @example {
     *   "data": {
     *     "description": "Ищем очень хорошего работника!",
     *     "education": "higher",
     *     "employment_type": "main",
     *     "field_of_art": "other",
     *     "id": "756",
     *     "min_years_of_work_experience": 5,
     *     "organization": {
     *       "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
     *       "contacts": "+78005553535",
     *       "description": "applicant",
     *       "employer": {
     *         "birth_date": "2000-01-01",
     *         "email": "username@domain.org",
     *         "fullname": "Иванов Иван Иванович",
     *         "id": "756",
     *         "phone": "+78001234567",
     *         "role": "employer"
     *       },
     *       "id": "756",
     *       "logo": "/uploads/urfu.png",
     *       "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
     *     },
     *     "proposed_salary": "20000",
     *     "published": true,
     *     "reviewed": true,
     *     "title": "Работник",
     *     "work_schedule": "full_time"
     *   }
     * }
     */
    VacancyResponse: {
      /**
       * Vacancy
       * @example {
       *   "description": "Ищем очень хорошего работника!",
       *   "education": "higher",
       *   "employment_type": "main",
       *   "field_of_art": "other",
       *   "id": "756",
       *   "min_years_of_work_experience": 5,
       *   "organization": {
       *     "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
       *     "contacts": "+78005553535",
       *     "description": "applicant",
       *     "employer": {
       *       "birth_date": "2000-01-01",
       *       "email": "username@domain.org",
       *       "fullname": "Иванов Иван Иванович",
       *       "id": "756",
       *       "phone": "+78001234567",
       *       "role": "employer"
       *     },
       *     "id": "756",
       *     "logo": "/uploads/urfu.png",
       *     "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
       *   },
       *   "proposed_salary": "20000",
       *   "published": true,
       *   "reviewed": true,
       *   "title": "Работник",
       *   "work_schedule": "full_time"
       * }
       */
      data: {
        description: string
        /** @enum {string} */
        education: 'none' | 'higher' | 'secondary' | 'secondary_vocational'
        /** @enum {string} */
        employment_type: 'main' | 'secondary' | 'practice' | 'internship'
        /** @enum {string} */
        field_of_art: 'music' | 'visual' | 'performing' | 'choreography' | 'folklore' | 'other'
        id: number
        /** @default 0 */
        min_years_of_work_experience: number
        /**
         * Organization
         * @example {
         *   "address": "620002, Свердловская область, г. Екатеринбург, ул. Мира, д. 19",
         *   "contacts": "+78005553535",
         *   "description": "applicant",
         *   "employer": {
         *     "birth_date": "2000-01-01",
         *     "email": "username@domain.org",
         *     "fullname": "Иванов Иван Иванович",
         *     "id": "756",
         *     "phone": "+78001234567",
         *     "role": "employer"
         *   },
         *   "id": "756",
         *   "logo": "/uploads/urfu.png",
         *   "name": "УрФУ имени первого Президента России Б.Н. Ельцина"
         * }
         */
        organization: {
          address: string
          contacts: string
          description: string
          /**
           * User
           * @example {
           *   "birth_date": "2000-01-01",
           *   "email": "username@domain.org",
           *   "fullname": "Иванов Иван Иванович",
           *   "id": "756",
           *   "phone": "+78001234567",
           *   "role": "employer"
           * }
           */
          employer: {
            /** Format: date */
            birth_date: string | null
            email: string
            fullname: string
            id: number
            /** Format: phone */
            phone: string
            /** Format: employer */
            role: string
          }
          id: number
          logo: string
          name: string
        }
        proposed_salary: number | null
        published: boolean
        reviewed: boolean
        title: string
        /** @enum {string} */
        work_schedule: 'full_time' | 'part_time' | 'remote_working' | 'hybrid_working' | 'flexible_schedule'
      }
    }
  }
  responses: object
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /** Check health */
  'CenWeb.HealthCheckController.check': {
    responses: {
      /** @description Health response */
      200: {
        content: {
          'application/json': components['schemas']['HealthCheckResponse']
        }
      }
    }
  }
  /** Create organization */
  'CenWeb.OrganizationController.create': {
    /** @description Organization params */
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateOrganizationRequest']
      }
    }
    responses: {
      /** @description Created organization */
      201: {
        content: {
          'application/json': components['schemas']['OrganizationResponse']
        }
      }
      /** @description Unauthorized */
      401: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
      /** @description You are not employer */
      403: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
      /** @description Changeset errors */
      422: {
        content: {
          'application/json': components['schemas']['ChangesetErrorsResponse']
        }
      }
    }
  }
  /** Get organization */
  'CenWeb.OrganizationController.show': {
    parameters: {
      path: {
        /**
         * @description Organization ID
         * @example 10132
         */
        organization_id: number
      }
    }
    responses: {
      /** @description Requested organization */
      201: {
        content: {
          'application/json': components['schemas']['OrganizationResponse']
        }
      }
      /** @description Unauthorized */
      401: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
      /** @description Organization not found */
      404: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
    }
  }
  /** Delete organization */
  'CenWeb.OrganizationController.delete': {
    parameters: {
      path: {
        /**
         * @description Organization ID
         * @example 10132
         */
        organization_id: number
      }
    }
    responses: {
      /** @description Organization deleted */
      204: {
        content: never
      }
      /** @description Unauthorized */
      401: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
      /** @description You are not the owner */
      403: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
    }
  }
  /** Update organization */
  'CenWeb.OrganizationController.update': {
    parameters: {
      path: {
        /**
         * @description Organization ID
         * @example 10132
         */
        organization_id: number
      }
    }
    /** @description Organization params */
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateOrganizationRequest']
      }
    }
    responses: {
      /** @description Requested organization */
      201: {
        content: {
          'application/json': components['schemas']['OrganizationResponse']
        }
      }
      /** @description Unauthorized */
      401: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
      /** @description You are not the owner */
      403: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
      /** @description Organization not found */
      404: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
    }
  }
  /** Create vacancy */
  'CenWeb.VacancyController.create': {
    parameters: {
      path: {
        /**
         * @description Organization ID
         * @example 10132
         */
        organization_id: number
      }
    }
    /** @description Vacancy params */
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateVacancyRequest']
      }
    }
    responses: {
      /** @description Created vacancy */
      201: {
        content: {
          'application/json': components['schemas']['VacancyResponse']
        }
      }
      /** @description Unauthorized */
      401: {
        content: never
      }
      /** @description Changeset errors */
      422: {
        content: {
          'application/json': components['schemas']['ChangesetErrorsResponse']
        }
      }
    }
  }
  /** Get access token */
  'CenWeb.TokenController.create': {
    /** @description credentials */
    requestBody?: {
      content: {
        'application/json': components['schemas']['UserCredentials']
      }
    }
    responses: {
      /** @description User's token */
      200: {
        content: {
          'application/json': components['schemas']['TokenResponse']
        }
      }
      /** @description Wrong email or password */
      401: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
    }
  }
  /** Create user */
  'CenWeb.UserController.create': {
    /** @description User params */
    requestBody?: {
      content: {
        'application/json': components['schemas']['CreateUserRequest']
      }
    }
    responses: {
      /** @description Created user */
      200: {
        content: {
          'application/json': components['schemas']['UserResponse']
        }
      }
      /** @description Changeset errors */
      422: {
        content: {
          'application/json': components['schemas']['ChangesetErrorsResponse']
        }
      }
    }
  }
  /** Get user by ID */
  'CenWeb.UserController.show': {
    responses: {
      /** @description Requested user */
      200: {
        content: {
          'application/json': components['schemas']['UserResponse']
        }
      }
    }
  }
  /** Delete user */
  'CenWeb.UserController.delete': {
    responses: {
      /** @description User deleted */
      204: {
        content: never
      }
    }
  }
  /** Update user */
  'CenWeb.UserController.update_info': {
    /** @description User params */
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateUserInfoRequest']
      }
    }
    responses: {
      /** @description Updated user */
      200: {
        content: {
          'application/json': components['schemas']['UserResponse']
        }
      }
      /** @description Changeset errors */
      422: {
        content: {
          'application/json': components['schemas']['ChangesetErrorsResponse']
        }
      }
    }
  }
  /** Search vacancies */
  'CenWeb.VacancyController.search': {
    parameters: {
      query?: {
        /** @description Search text */
        text?: string
        /** @description Employment types */
        'employment_types[]'?: ('main' | 'secondary' | 'practice' | 'internship')[]
        /** @description Employment types */
        'work_schedules[]'?: ('full_time' | 'part_time' | 'remote_working' | 'hybrid_working' | 'flexible_schedule')[]
        /** @description Education */
        education?: 'none' | 'higher' | 'secondary' | 'secondary_vocational'
        /** @description Field of art */
        field_of_art?: 'music' | 'visual' | 'performing' | 'choreography' | 'folklore' | 'other'
        /** @description Years of work experience */
        years_of_work_experience?: number
        /** @description Preferred salary */
        preferred_salary?: number
        /** @description Page number */
        page?: number
        /** @description Page size */
        page_size?: number
      }
    }
    responses: {
      /** @description Vacancies list */
      200: {
        content: {
          'application/json': components['schemas']['VacanciesQueryResponse']
        }
      }
    }
  }
  /** Get vacancy */
  'CenWeb.VacancyController.show': {
    parameters: {
      path: {
        /**
         * @description Vacancy ID
         * @example 10132
         */
        vacancy_id: number
      }
    }
    responses: {
      /** @description Requested vacancy */
      201: {
        content: {
          'application/json': components['schemas']['VacancyResponse']
        }
      }
      /** @description Unauthorized */
      401: {
        content: never
      }
      /** @description Vacancy not found */
      404: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
    }
  }
  /** Delete vacancy */
  'CenWeb.VacancyController.delete': {
    parameters: {
      path: {
        /**
         * @description Vacancy ID
         * @example 10132
         */
        vacancy_id: number
      }
    }
    responses: {
      /** @description Vacancy deleted */
      204: {
        content: never
      }
      /** @description Unauthorized */
      401: {
        content: never
      }
    }
  }
  /** Update vacancy */
  'CenWeb.VacancyController.update': {
    parameters: {
      path: {
        /**
         * @description Vacancy ID
         * @example 10132
         */
        vacancy_id: number
      }
    }
    /** @description Vacancy params */
    requestBody?: {
      content: {
        'application/json': components['schemas']['UpdateVacancyRequest']
      }
    }
    responses: {
      /** @description Requested vacancy */
      201: {
        content: {
          'application/json': components['schemas']['VacancyResponse']
        }
      }
      /** @description Unauthorized */
      401: {
        content: never
      }
      /** @description Vacancy not found */
      404: {
        content: {
          'application/json': components['schemas']['GenericErrorResponse']
        }
      }
    }
  }
}
