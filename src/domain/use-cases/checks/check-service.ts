interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type FailureCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly successCallback: SuccessCallback,
		private readonly failureCallback: FailureCallback
	) {}

	async execute(url: string): Promise<boolean> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`${url} is down`);
			}
			this.successCallback();
			return true;
		} catch (error) {
			this.failureCallback(`${error}`);
			return false;
		}
	}
}
