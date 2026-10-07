'use server';

import { 
    tambahSiswa as _tambah, 
    updateSiswa as _update, 
    hapusSiswa as _hapus, 
    deleteSiswa as _delete 
} from './action';

export async function tambahSiswa(formData) {
    return _tambah(formData);
}

export async function updateSiswa(formData) {
    return _update(formData);
}

export async function hapusSiswa(no_urut) {
    return _hapus(no_urut);
}

export async function deleteSiswa(no_urut) {
    return _delete(no_urut);
}
