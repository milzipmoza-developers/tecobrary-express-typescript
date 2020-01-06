export class GithubUserVo {
    private readonly _githubId: number;
    private readonly _email: string;
    private readonly _name: string;
    private readonly _avatarUrl: string;

    constructor(githubId: string, email: string, name: string, avatarUrl: string) {
        this._githubId = parseInt(githubId);
        this._email = email;
        this._name = name;
        this._avatarUrl = avatarUrl;
    }

    get githubId(): number {
        return this._githubId;
    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get avatarUrl(): string {
        return this._avatarUrl;
    }
}