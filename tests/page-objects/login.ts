import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    public password: string = 'secret_sauce';
    public usernames: string[] = [
        'standard_user',
        'locked_out_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user',
      ];
    constructor(page: Page) {
        this.page = page;
    }
}