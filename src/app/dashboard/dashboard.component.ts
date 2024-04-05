import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  sleep(delay: number) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
 }
  onLogin(){
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = 'https://splashchemicals.in/check/api/login/redirect';
    const authWindow = window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    // console.log(authWindow)
    // authWindow?.close()
    // console.log('before timer')
    // setTimeout(()=>{
    //   console.log('inside timer')
    //   console.log(authWindow)
    //   //authWindow?.close()
    //   console.log('after timer')
    //   console.log(authWindow)
    // }, 250)

    // const signInCheckInterval = setInterval(()=>{
    //   console.log('fdfdfdf'+authWindow?.location.href)
    //   if(authWindow?.closed){
    //     clearInterval(signInCheckInterval)
    //   }
    //   else{
    //     try{
    //       if(window?.location.href.includes('callback')){
    //         localStorage.setItem('sunni', 'umbu')
    //         authWindow!.close()
    //         clearInterval(signInCheckInterval)
    //       }
    //     }
    //     catch(error){
    //       console.log(error)
    //     }
    //   }
    // }, 5);
    // console.log(authWindow?.location.href)
    // authWindow?.postMessage('hello from auth window')
    // window.addEventListener('message', (event)=>{
    //   console.log('inside event listener');
    //   if(event.data === 'token'){
    //     authWindow?.close()
    //   }
    // })

    const authObservable = new Subject<any>();
    console.log('kk');
    const windowListener = (event: MessageEvent) => {
      console.log(event.data);
      if (event.origin === window.location.origin) {
        console.log('inside')
        // Check if the message contains authentication data
        if (event.data.type === 'authResult') {
          authWindow?.close();
          authObservable.next(event.data.payload);
          authObservable.complete();
          window.removeEventListener('message', windowListener);
        }
      }
    };

    // Add event listener to listen for messages from the popup window
    authWindow?.addEventListener('message', windowListener);
    authObservable.asObservable().subscribe(
      (payload) => {
        // Handle successful authentication
        console.log('Authenticated', payload);
      },
      (error) => {
        // Handle authentication error
        console.error('Authentication error', error);
      }
    );

  }
}
