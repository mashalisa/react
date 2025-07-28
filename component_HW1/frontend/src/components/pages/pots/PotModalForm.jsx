import ModalButton from '../../basic/ModalButton';
import InputField from '../../form/InputField';
import ButtonSubmit from '../../basic/ButtonSubmit';
import ProgressBar from '../../basic/ProgressBar';
import ProgressBarFooter from '../../basic/ProgressBarFooter';

const PotModalForm = ({
  btnName,
  heading,
  pot,
  formData,
  onChange,
  onSubmit,
  colorNumber,
  action,
  setError,
  resetForm,
  error,
}) => (
  <ModalButton
    btnName={btnName}
    onOpen={() => {
      setError('');
      resetForm();
    }}
    onClose={resetForm}
  >
    {({ close }) => (
      <>
        <h2>{heading}</h2>
        <div className="card-body">
          <p>New Amount</p>
          <h6>
            $
            {(action === 'withdraw'
              ? parseFloat(pot.current_amount) - parseFloat(formData.amount || 0)
              : parseFloat(pot.current_amount) + parseFloat(formData.amount || 0)
            ).toFixed(2)}
          </h6>
        </div>

        <ProgressBar
          formData={formData.amount}
          newAmount={
            action === 'withdraw'
              ? parseFloat(pot.current_amount) - parseFloat(formData.amount || 0)
              : parseFloat(pot.current_amount) + parseFloat(formData.amount || 0)
          }
          total={pot.goal_amount}
          current_amount={pot.current_amount}
          colorNumber={colorNumber}
          style={{ height: '8px' }}
        />
        <ProgressBarFooter
          formData={formData.amount}
          current_amount={pot.current_amount}
          total={pot.goal_amount}
          newAmount={
            action === 'withdraw'
              ? parseFloat(pot.current_amount) - parseFloat(formData.amount || 0)
              : parseFloat(pot.current_amount) + parseFloat(formData.amount || 0)
          }
        />

        <form>
          <InputField
            type="number"
            name="amount"
            label_name="Amount"
            value={formData.amount || ''}
            onChange={onChange}
            placeholder="$"
          />
          <ButtonSubmit
            onClick={(e) => onSubmit(e, close, action, formData)}
            name={`Confirm ${action}`}
          />
        </form>

        {error && <p className='error-message'>{error}</p>}
      </>
    )}
  </ModalButton>
);

export default PotModalForm;
