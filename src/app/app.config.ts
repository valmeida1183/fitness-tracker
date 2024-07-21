import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    //provideFirebaseApp(() => initializeApp({"projectId":"valmeida-fitness-tracker","appId":"1:639438471753:web:ab38a3e2a857282db17598","storageBucket":"valmeida-fitness-tracker.appspot.com","apiKey":"AIzaSyDl0d6tcxOLb1MpONPvRdk7yaQiJ5FYQwg","authDomain":"valmeida-fitness-tracker.firebaseapp.com","messagingSenderId":"639438471753"})),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    MatNativeDateModule,
  ],
};
