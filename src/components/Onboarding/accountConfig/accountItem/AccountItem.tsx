
import Switch from '@/components/units/Switch'
import styles from './accountItem.module.sass'

const AccountItem = ({index, accountType, accountNumber, handleChange, selected}) => {

  return (
    <div className={`${styles.accountItem_grid} mb-2`}>
          <Switch
            id={accountNumber}
            value={selected}
            checked={selected}
            onChangeFn={(e) => handleChange(e, index)}
            labelTxt={accountNumber}
          />
          <div>
            {accountType.split(' ')[0] === accountNumber ? accountType.split(' ').slice(2).join(' ') : accountType}
          </div>
    </div>
    
  )
}

export default AccountItem